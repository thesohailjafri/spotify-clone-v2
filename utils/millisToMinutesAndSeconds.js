export default function millisToMinutesAndSeconds(millis) {
  if (!millis) return '00:00'
  var minutes = Math.floor(millis / 60000)
  var seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
