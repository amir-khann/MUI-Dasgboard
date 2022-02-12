export const getQueryBuilderApi = (callback) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjEwMDAwMDgsIkF1dGhJRCI6ImVjNWNhNTMwLTg4YjEtMTFlYy1hMGVkLTE3OTc1YjlmZjJlYSIsIk1GQSI6ZmFsc2UsIkF1dGhvcml6ZWQiOnRydWUsImF1ZCI6Imh0dHBzOi8vaGVsaXVtLXV4LXNhbmRib3gtZG90LWhlbGl1bWFwcC1kZXYud2wuci5hcHBzcG90LmNvbSIsImV4cCI6MTY0NDM5MjIyOSwiaXNzIjoiMTAwMDAwMSIsInN1YiI6IjEwMDAwMDgifQ.IfF0cKd8PJRD6xfx-0xaA0Uu6ov5jjPc2K5Wg78fZS0");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
    };
    fetch("http://helium-go-server-dot-heliumapp-dev.wl.r.appspot.com/api/v1/querybuilder/config", requestOptions)
        .then(response => response.text())
        .then(result => callback(result))
        .catch(error => callback(error));
}