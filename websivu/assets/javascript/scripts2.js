
const r = document.querySelector(':root');
r.style.setProperty('--blue', '#0c1483');
r.style.setProperty('--lightblue', '#e2effb');
function myFunction_set() {
    let rs = String(getComputedStyle(r).getPropertyValue('--blue'));

    if (rs === "#0c1483") {
        document.getElementById("themebtn").value = "light theme"
        r.style.setProperty('--blue', '#e2effb');
        r.style.setProperty('--lightblue', '#0c1483');
    } else if (rs.valueOf == "#e2effb".valueOf) {
        document.getElementById("themebtn").value = "dark theme"
        r.style.setProperty('--blue', '#0c1483');
        r.style.setProperty('--lightblue', '#e2effb');
    }

}