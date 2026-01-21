# Make All GitHub Repos Public
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Visibility: PUBLIC" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get repos
Write-Host "[1/3] Fetching repositories..." -ForegroundColor Yellow
$repos = gh repo list --limit 1000 --json nameWithOwner,isPrivate,owner | ConvertFrom-Json
Write-Host "Found $($repos.Count) repositories" -ForegroundColor Green
Write-Host ""

# Filter
Write-Host "[2/3] Analyzing visibility..." -ForegroundColor Yellow
$private = $repos | Where-Object { $_.isPrivate }
$public = $repos | Where-Object { -not $_.isPrivate }
Write-Host "  Public: $($public.Count)" -ForegroundColor Green
Write-Host "  Private: $($private.Count)" -ForegroundColor Yellow
Write-Host ""

if ($private.Count -eq 0) {
    Write-Host "All repos are already public!" -ForegroundColor Green
    exit 0
}

# Make public
Write-Host "[3/3] Making repos public..." -ForegroundColor Yellow
Write-Host ""

$user = gh api user --jq .login
$success = 0
$failed = 0

foreach ($repo in $private) {
    if ($repo.owner.login -eq $user) {
        Write-Host "  -> Making $($repo.nameWithOwner) public..." -ForegroundColor Cyan
        
        try {
            $null = gh repo edit $repo.nameWithOwner --visibility public 2>&1
            Write-Host "  OK $($repo.nameWithOwner) is now public" -ForegroundColor Green
            $success++
        }
        catch {
            Write-Host "  ERROR Failed: $($repo.nameWithOwner)" -ForegroundColor Red
            $failed++
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Success: $success | Failed: $failed" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
