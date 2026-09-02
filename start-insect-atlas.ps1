$ErrorActionPreference = "Stop"
$port = 8030
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = "http://127.0.0.1:$port/index.html"
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($listener) {
  try { $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 3 } catch { throw "포트 $port 를 다른 서비스가 사용 중이거나 Insect Atlas 응답이 아닙니다." }
  if ($response.Content -notmatch 'Insect Atlas') { throw "포트 $port 는 Insect Atlas 서버가 아닙니다." }
  Write-Host "Insect Atlas 서버가 이미 실행 중입니다: $url"
  Start-Process $url
  exit 0
}
$python = (Get-Command python -ErrorAction Stop).Source
$logDir = Join-Path $root '.insect-atlas'
New-Item -ItemType Directory -Path $logDir -Force | Out-Null
$process = Start-Process -FilePath $python -ArgumentList @('-m','http.server',"$port",'--bind','127.0.0.1') -WorkingDirectory $root -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $logDir 'server.out.log') -RedirectStandardError (Join-Path $logDir 'server.err.log')
for ($attempt = 0; $attempt -lt 20; $attempt += 1) {
  Start-Sleep -Milliseconds 250
  try { $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 2 } catch { continue }
  if ($response.Content -match 'Insect Atlas') { Write-Host "Insect Atlas 시작됨 (PID $($process.Id)): $url"; Start-Process $url; exit 0 }
}
if (-not $process.HasExited) { Stop-Process -Id $process.Id -Force }
throw "Insect Atlas 서버가 준비되지 않았습니다. .insect-atlas\\server.err.log 를 확인하세요."

