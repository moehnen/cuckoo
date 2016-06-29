const getPlayer = panel => panel.getElementsByTagName("audio")[0]

const getPanel = (player) => player.parentElement.parentElement

const isPlaying = panel => !getPlayer(panel).paused

const startPlaying = panel => getPlayer(panel).play()

const stopPlaying = panel => getPlayer(panel).pause()

const togglePlaying = panel => isPlaying(panel) ? stopPlaying(panel) : startPlaying(panel)

const panelTemplate = document.getElementById("panel").innerHTML

const panelHtml = panel => panelTemplate.replace(/{(.+?)}/mg, (match, key) => panel[key])

const rowHtml = row => row.map(panel => panelHtml(panel)).join('')

const appHtml = sounds.map(row => `<div class="row">${rowHtml(row)}</div>`).join('')

document.body.insertAdjacentHTML("afterbegin", appHtml)

document.addEventListener("playing", e => getPanel(e.target).classList.add('active'), true)

document.addEventListener("pause", e => getPanel(e.target).classList.remove('active'), true)

document.onkeydown = e => togglePlaying(document.getElementById(String.fromCharCode(e.keyCode)))