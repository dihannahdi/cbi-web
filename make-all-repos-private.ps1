# Make All GitHub Repos Private
Write-Host '========================================' -ForegroundColor Cyan
Write-Host 'GitHub Repository Privacy Automation' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ''

# Get repos
Write-Host '[1/3] Fetching repositories...' -ForegroundColor Yellow
$repos = gh repo list --limit 1000 --json nameWithOwner,isPrivate,owner | ConvertFrom-Json
Write-Host "Found $($repos.Count) repositories" -ForegroundColor Green
Write-Host ''

# Filter
Write-Host '[2/3] Analyzing visibility...' -ForegroundColor Yellow
$public = $repos | Where-Object { -not $_.isPrivate }
$private = $repos | Where-Object { $_.isPrivate }
Write-Host "  Private: $($private.Count)" -ForegroundColor Green
Write-Host "  Public: $($public.Count)" -ForegroundColor Yellow
Write-Host ''

if ($public.Count -eq 0) {
    Write-Host 'All repos are already private!' -ForegroundColor Green
    exit 0
}

# Make private
Write-Host '[3/3] Making repos private...' -ForegroundColor Yellow
Write-Host ''

$user = gh api user --jq .login
$success = 0
$failed = 0

foreach ($repo in $public) {
    if ($repo.owner.login -eq $user) {
        Write-Host "  → Making $($repo.nameWithOwner) private..." -ForegroundColor Cyan
        
        try {
            $null = gh repo edit $repo.nameWithOwner --visibility private 2>&1
            Write-Host "  ✓ $($repo.nameWithOwner) is now private" -ForegroundColor Green
            $success++
        }
        catch {
            Write-Host "  ✗ Failed: $($repo.nameWithOwner)" -ForegroundColor Red
            $failed++
        }
    }
}

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host "Successfully made $success repositories private!" -ForegroundColor Green
if ($failed -gt 0) {
    Write-Host "Failed: $failed repositories" -ForegroundColor Red
}
Write-Host '========================================' -ForegroundColor Cyan
