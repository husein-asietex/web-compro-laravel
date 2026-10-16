[CmdletBinding()]
param(
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'

$projectRoot = [System.IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\')
$releaseDirectory = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'release')).TrimEnd('\')

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $outputFile = Join-Path $releaseDirectory 'asietex-release.zip'
} else {
    $outputFile = [System.IO.Path]::GetFullPath($OutputPath)
}

$outputDirectory = Split-Path -Parent $outputFile
$temporaryRoot = Join-Path ([System.IO.Path]::GetTempPath()) ('asietex-release-' + [guid]::NewGuid().ToString('N'))
$releaseRoot = Join-Path $temporaryRoot 'release'

if (-not $outputFile.StartsWith($releaseDirectory + '\', [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "OutputPath must be inside the release directory: $releaseDirectory"
}

function Copy-ReleaseDirectory {
    param([Parameter(Mandatory)][string]$Path)

    $source = Join-Path $projectRoot $Path

    if (-not (Test-Path -LiteralPath $source -PathType Container)) {
        throw "Required release directory is missing: $source"
    }

    Copy-Item -LiteralPath $source -Destination (Join-Path $releaseRoot $Path) -Recurse -Force
}

function Copy-ReleaseFile {
    param([Parameter(Mandatory)][string]$Path)

    $source = Join-Path $projectRoot $Path

    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
        throw "Required release file is missing: $source"
    }

    Copy-Item -LiteralPath $source -Destination (Join-Path $releaseRoot $Path) -Force
}

try {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'public\build') -PathType Container)) {
        throw 'public/build is missing. Run npm run build before packaging the release.'
    }

    New-Item -ItemType Directory -Path $releaseRoot -Force | Out-Null

    foreach ($directory in @('app', 'bootstrap', 'config', 'database', 'public', 'routes', 'storage', 'vendor')) {
        Copy-ReleaseDirectory -Path $directory
    }

    New-Item -ItemType Directory -Path (Join-Path $releaseRoot 'resources') -Force | Out-Null
    Copy-Item -LiteralPath (Join-Path $projectRoot 'resources\views') -Destination (Join-Path $releaseRoot 'resources\views') -Recurse -Force

    foreach ($file in @('artisan', 'composer.json', 'composer.lock')) {
        Copy-ReleaseFile -Path $file
    }

    Get-ChildItem -LiteralPath (Join-Path $releaseRoot 'bootstrap\cache') -File -Filter '*.php' -ErrorAction SilentlyContinue | Remove-Item -Force

    foreach ($runtimeDirectory in @('storage\logs', 'storage\framework\cache', 'storage\framework\sessions', 'storage\framework\views')) {
        $path = Join-Path $releaseRoot $runtimeDirectory

        if (Test-Path -LiteralPath $path) {
            Get-ChildItem -LiteralPath $path -Force | Where-Object Name -ne '.gitignore' | Remove-Item -Recurse -Force
        }
    }

    Get-ChildItem -LiteralPath (Join-Path $releaseRoot 'database') -File -Filter '*.sqlite' -ErrorAction SilentlyContinue | Remove-Item -Force
    Remove-Item -LiteralPath (Join-Path $releaseRoot 'public\hot') -Force -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath (Join-Path $releaseRoot 'public\fonts-manifest.dev.json') -Force -ErrorAction SilentlyContinue

    if (-not (Test-Path -LiteralPath $outputDirectory)) {
        New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
    }

    Remove-Item -LiteralPath $outputFile -Force -ErrorAction SilentlyContinue
    Compress-Archive -Path (Join-Path $releaseRoot '*') -DestinationPath $outputFile -CompressionLevel Optimal

    if (-not (Test-Path -LiteralPath $outputFile -PathType Leaf)) {
        throw "Release archive was not created: $outputFile"
    }

    Write-Output "Release archive created: $outputFile"
}
finally {
    if (Test-Path -LiteralPath $temporaryRoot) {
        Remove-Item -LiteralPath $temporaryRoot -Recurse -Force
    }
}
