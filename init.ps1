$dir = (Convert-Path "$PSScriptRoot\")
$name = Split-Path "${dir}" -Leaf
New-Item -Value "${dir}src" -Path "${dir}DevTest\.obsidian\plugins\${name}" -ItemType Junction
New-Item -Value "${dir}manifest.json" -Path "${dir}src/manifest.json" -ItemType HardLink