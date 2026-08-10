param(
  [string]$Action = "list",
  [string]$Remote = "public_html/",
  [string]$Local = ""
)
$user = if ($env:WP_HOST_USER) { $env:WP_HOST_USER } else { "institutoaprecap" }
$pass = if ($env:WP_HOST_PASS) { $env:WP_HOST_PASS } else { "uHyx8V0tiplwrJXGovk0F" }
$cred = New-Object System.Net.NetworkCredential($user, $pass)

function New-FtpRequest([string]$path, [string]$method) {
    $req = [System.Net.FtpWebRequest]::Create("ftp://ftp.aprecap.cl/$path")
    $req.Method = $method
    $req.Credentials = $cred
    $req.UsePassive = $true
    $req.KeepAlive = $false
    return $req
}

try {
    switch ($Action) {
        "list" {
            $r = New-Ftp $Remote ([System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails)
            $resp = $r.GetResponse()
            $sr = New-Object System.IO.StreamReader($resp.GetResponseStream())
            $sr.ReadToEnd()
            $sr.Close(); $resp.Close()
        }
        "get" {
            $r = New-Ftp $Remote ([System.Net.WebRequestMethods+Ftp]::DownloadFile)
            $resp = $r.GetResponse()
            $fs = [System.IO.File]::Create($Local)
            $resp.GetResponseStream().CopyTo($fs)
            $fs.Close(); $resp.Close()
            "OK: $Local"
        }
        "put" {
            $bytes = [System.IO.File]::ReadAllBytes($Local)
            $r = New-Ftp $Remote ([System.Net.WebRequestMethods+Ftp]::UploadFile)
            $r.UseBinary = $true
            $s = $r.GetRequestStream()
            $s.Write($bytes, 0, $bytes.Length)
            $s.Close()
            $resp = $r.GetResponse()
            $resp.Close()
            "OK: $Remote"
        }
        "del" {
            $r = New-Ftp $Remote ([System.Net.WebRequestMethods+Ftp]::DeleteFile)
            $resp = $r.GetResponse()
            $resp.Close()
            "OK: $Remote"
        }
    }
} catch {
    "ERR: $($_.Exception.Message)"
}