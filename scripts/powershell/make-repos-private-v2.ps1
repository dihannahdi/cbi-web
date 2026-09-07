# Make All GitHub Repos Private
Write-Host '========================================' -ForegroundColor Cyan
Write-Host 'GitHub Repository Privacy Automation' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan

# Step 1: Install GitHub CLI
Write-Host '[1/5] Checking GitHub CLI...' -ForegroundColor Yellow
$gh = Get-Command gh -ErrorAction SilentlyContinue
if (-not $gh) {
    Write-Host 'Installing GitHub CLI...' -ForegroundColor Green
    winget install --id GitHub.cli --silent --accept-source-agreements --accept-package-agreements
    Write-Host 'Please restart PowerShell and run this script again.' -ForegroundColor Yellow
    exit
}
Write-Host 'OK GitHub CLI installed' -ForegroundColor Green

# Step 2: Authenticate
Write-Host '[2/5] Checking authentication...' -ForegroundColor Yellow
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Starting authentication...' -ForegroundColor Yellow
    gh auth login
}
Write-Host 'OK Authenticated' -ForegroundColor Green

# Step 3: Get repos
Write-Host '[3/5] Fetching repositories...' -ForegroundColor Yellow
$repos = gh repo list --limit 1000 --json nameWithOwner,isPrivate,owner | ConvertFrom-Json
Write-Host \"Found $($repos.Count) repositories\" -ForegroundColor Green

# Step 4: Filter
Write-Host '[4/5] Analyzing visibility...' -ForegroundColor Yellow
$public = $repos | Where-Object { -not $_.isPrivate }
$private = $repos | Where-Object { $_.isPrivate }
Write-Host \"  Private: $($private.Count)\" -ForegroundColor Green
Write-Host \"  Public: $($public.Count)\" -ForegroundColor Yellow

if ($public.Count -eq 0) {
    Write-Host 'All repos are already private!' -ForegroundColor Green
    exit 0
}

# Step 5: Make private
Write-Host '[5/5] Making repos private...' -ForegroundColor Yellow
$user = gh api user --jq .login
$success = 0
foreach ($repo in $public) {
    if ($repo.owner.login -eq $user) {
        Write-Host \"  Making $($repo.nameWithOwner) private...\" -ForegroundColor Cyan
        gh repo edit $repo.nameWithOwner --visibility private 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host \"  OK $($repo.nameWithOwner)\" -ForegroundColor Green
            $success++
        }
    }
}

Write-Host '========================================' -ForegroundColor Cyan
Write-Host \"Successfully made $success repositories private!\" -ForegroundColor Green
Write-Host '========================================' -ForegroundColor Cyan
