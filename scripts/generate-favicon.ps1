Add-Type -AssemblyName System.Drawing

$pngPath = "d:\aprecap\web\public\logo\logo-icon-512.png"
$icoAppPath = "d:\aprecap\web\src\app\favicon.ico"
$icoPublicPath = "d:\aprecap\web\public\favicon.ico"

$img = [System.Drawing.Image]::FromFile($pngPath)
$thumb = New-Object System.Drawing.Bitmap($img, 64, 64)
$hIcon = $thumb.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)

$fs1 = New-Object System.IO.FileStream($icoAppPath, [System.IO.FileMode]::Create)
$icon.Save($fs1)
$fs1.Close()

$fs2 = New-Object System.IO.FileStream($icoPublicPath, [System.IO.FileMode]::Create)
$icon.Save($fs2)
$fs2.Close()

$img.Dispose()
$thumb.Dispose()

Write-Output "OK: Favicon ICO reemplazado exitosamente en src/app/favicon.ico y public/favicon.ico"
