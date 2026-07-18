$ErrorActionPreference = 'Stop'

$root = Join-Path $PSScriptRoot '..\src\assets\FoodItems'
$groups = @(
  @{ Folder='valheim'; Api='https://valheim.fandom.com/api.php'; Items=@(
    @('minced-meat-sauce','Minced meat sauce'), @('queens-jam',"Queen's jam"), @('carrot-soup','Carrot soup'), @('deer-stew','Deer stew'),
    @('muckshake','Muckshake'), @('turnip-stew','Turnip stew'), @('sausages','Sausages'), @('black-soup','Black soup'),
    @('serpent-stew','Serpent stew'), @('wolf-skewer','Wolf skewer'), @('eyescream','Eyescream'), @('fish-wraps','Fish wraps'),
    @('lox-meat-pie','Lox meat pie'), @('blood-pudding','Blood pudding'), @('meat-platter','Meat platter'), @('honey-glazed-chicken','Honey glazed chicken'),
    @('misthare-supreme','Misthare supreme'), @('mushroom-omelette','Mushroom omelette'), @('stuffed-mushroom','Stuffed mushroom'), @('yggdrasil-porridge','Yggdrasil porridge')
  )},
  @{ Folder='fallout-76'; Api='https://fallout.wiki/api.php'; Items=@(
    @('appalachili','Appalachili'), @('baked-bloatfly','Baked bloatfly'), @('blackberry-honey-crisp','Blackberry honey crisp'), @('brain-bombs','Brain bombs'),
    @('cranberry-meatball-grinder','Cranberry meatball grinder'), @('deathclaw-wellington','Deathclaw Wellington'), @('fasnacht-donut','Fasnacht donut'), @('fried-deerskins','Fried deerskins'),
    @('glowing-fungus-puree','Glowing fungus puree'), @('iguana-soup','Iguana soup'), @('mirelurk-cake-bloodleaf-aioli','Mirelurk cake with bloodleaf aioli'), @('pepperoni-roll','Pepperoni roll'),
    @('pumpkin-pie','Pumpkin pie'), @('radscorpion-kebab','Radscorpion Kebab'), @('ribeye-steak','Ribeye steak'), @('silt-bean-puree','Silt bean puree'),
    @('smoked-mirelurk-fillets','Smoked mirelurk fillets'), @('squirrel-on-a-stick','Squirrel on a stick'), @('tato-salad','Tato salad'), @('tasty-squirrel-stew','Tasty squirrel stew')
  )},
  @{ Folder='red-dead-redemption-2'; Api='https://reddead.fandom.com/api.php'; Items=@(
    @('plain-big-game','Big Game Meat'), @('minty-big-game','Big Game Meat'), @('oregano-big-game','Big Game Meat'), @('thyme-big-game','Big Game Meat'),
    @('plain-prime-beef','Prime Beef'), @('minty-prime-beef','Prime Beef'), @('oregano-prime-beef','Prime Beef'), @('thyme-prime-beef','Prime Beef'),
    @('plain-mature-venison','Mature Venison'), @('minty-mature-venison','Mature Venison'), @('oregano-mature-venison','Mature Venison'), @('thyme-mature-venison','Mature Venison'),
    @('plain-tender-pork','Tender Pork'), @('minty-tender-pork','Tender Pork'), @('oregano-tender-pork','Tender Pork'), @('thyme-tender-pork','Tender Pork'),
    @('plain-succulent-fish','Succulent Fish Meat'), @('minty-succulent-fish','Succulent Fish Meat'), @('oregano-succulent-fish','Succulent Fish Meat'), @('thyme-succulent-fish','Succulent Fish Meat')
  )}
)

foreach ($group in $groups) {
  $directory = Join-Path $root $group.Folder
  New-Item -ItemType Directory -Force -Path $directory | Out-Null
  foreach ($item in $group.Items) {
    $slug, $title = $item
    $query = [uri]::EscapeDataString($title)
    $uri = "$($group.Api)?action=query&format=json&redirects=1&prop=pageimages&piprop=original&titles=$query"
    $response = Invoke-RestMethod -Uri $uri
    $page = $response.query.pages.PSObject.Properties.Value | Select-Object -First 1
    $source = $page.original.source
    if (-not $source) {
      $imageResponse = Invoke-RestMethod -Uri "$($group.Api)?action=query&format=json&prop=images&imlimit=50&titles=$query"
      $imagePage = $imageResponse.query.pages.PSObject.Properties.Value | Select-Object -First 1
      $target = ($title -replace '[^a-zA-Z0-9]', '').ToLowerInvariant()
      $aliases = @{ 'mincedmeatsauce'='mincemeatsauce'; 'blacksoup'='blacksoup' }
      if ($aliases.ContainsKey($target)) { $target = $aliases[$target] }
      $file = $imagePage.images | Where-Object {
        $candidate = ($_.title -replace '^File:|\.[^.]+$|[^a-zA-Z0-9]', '').ToLowerInvariant()
        $candidate -eq $target -or $candidate.Contains($target)
      } | Select-Object -First 1
      if ($file) {
        $fileQuery = [uri]::EscapeDataString($file.title)
        $fileResponse = Invoke-RestMethod -Uri "$($group.Api)?action=query&format=json&prop=imageinfo&iiprop=url&titles=$fileQuery"
        $filePage = $fileResponse.query.pages.PSObject.Properties.Value | Select-Object -First 1
        $source = $filePage.imageinfo[0].url
      }
    }
    if (-not $source) { Write-Warning "No image for $title"; continue }
    $extension = [IO.Path]::GetExtension(([uri]$source).AbsolutePath.Split('/revision/')[0])
    if (-not $extension) { $extension = '.png' }
    Invoke-WebRequest -Uri $source -OutFile (Join-Path $directory "$slug$extension")
  }
}

# The Red Dead wiki uses one HUD icon for all seasoning variants and does not
# expose primary images for several base-meat pages. Preserve that source-faithful
# convention by reusing the retrieved cooked-meat icon for those variants.
$rdrDirectory = Join-Path $root 'red-dead-redemption-2'
$rdrFallbacks = @(
  'plain-mature-venison','minty-mature-venison','oregano-mature-venison','thyme-mature-venison',
  'plain-tender-pork','minty-tender-pork','oregano-tender-pork','thyme-tender-pork',
  'plain-succulent-fish','minty-succulent-fish','oregano-succulent-fish','thyme-succulent-fish'
)
foreach ($slug in $rdrFallbacks) {
  Copy-Item (Join-Path $rdrDirectory 'plain-big-game.png') (Join-Path $rdrDirectory "$slug.png") -Force
}
