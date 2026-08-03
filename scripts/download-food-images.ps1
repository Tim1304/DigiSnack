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
  @{ Folder='minecraft'; Api='https://minecraft.fandom.com/api.php'; Items=@(
    @('apple','Apple'), @('baked-potato','Baked Potato'), @('beetroot','Beetroot'), @('beetroot-soup','Beetroot Soup'),
    @('bread','Bread'), @('cake','Cake'), @('carrot','Carrot'), @('chorus-fruit','Chorus Fruit'),
    @('cooked-chicken','Cooked Chicken'), @('cooked-cod','Cooked Cod'), @('cooked-mutton','Cooked Mutton'), @('cooked-porkchop','Cooked Porkchop'),
    @('cooked-rabbit','Cooked Rabbit'), @('cooked-salmon','Cooked Salmon'), @('cookie','Cookie'), @('dried-kelp','Dried Kelp'),
    @('enchanted-golden-apple','Enchanted Golden Apple'), @('golden-apple','Golden Apple'), @('glow-berries','Glow Berries'), @('golden-carrot','Golden Carrot'),
    @('honey-bottle','Honey Bottle'), @('melon-slice','Melon Slice'), @('mushroom-stew','Mushroom Stew'), @('poisonous-potato','Poisonous Potato'),
    @('potato','Potato'), @('pufferfish','Pufferfish (item)'), @('pumpkin-pie','Pumpkin Pie'), @('rabbit-stew','Rabbit Stew'),
    @('raw-beef','Raw Beef'), @('raw-chicken','Raw Chicken'), @('raw-cod','Raw Cod'), @('raw-mutton','Raw Mutton'),
    @('raw-porkchop','Raw Porkchop'), @('raw-rabbit','Raw Rabbit'), @('raw-salmon','Raw Salmon'), @('rotten-flesh','Rotten Flesh'),
    @('spider-eye','Spider Eye'), @('steak','Steak'), @('suspicious-stew','Suspicious Stew'), @('sweet-berries','Sweet Berries'),
    @('tropical-fish','Tropical Fish (item)')
  )}
)

foreach ($group in $groups) {
  $directory = Join-Path $root $group.Folder
  New-Item -ItemType Directory -Force -Path $directory | Out-Null
  foreach ($item in $group.Items) {
    $slug, $title = $item
    if (Get-ChildItem -LiteralPath $directory -File -Filter "$slug.*" | Select-Object -First 1) {
      continue
    }
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

$cardApi = 'https://minecraft.fandom.com/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&pithumbsize=900&titles=Minecraft'
$cardPage = (Invoke-RestMethod -Uri $cardApi).query.pages.PSObject.Properties.Value | Select-Object -First 1
if ($cardPage.thumbnail.source) {
  Invoke-WebRequest -Uri $cardPage.thumbnail.source -OutFile (Join-Path $PSScriptRoot '..\src\assets\GameCards\minecraft.png')
}
