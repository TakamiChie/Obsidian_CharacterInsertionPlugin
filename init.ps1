$dir = (Convert-Path "$PSScriptRoot\")
$name = Split-Path "${dir}" -Leaf
New-Item -Value "${dir}src" -Path "${dir}DevTest\.obsidian\plugins\${name}" -ItemType Junction