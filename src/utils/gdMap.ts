export function AMapGeocoder () {
  // if (window.AMap) return Promise.resolve()
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://webapi.amap.com/maps?v=2.0&key=' +
      '943670d17918b89431859d672597c0cc' +
      '&plugin=AMap.Geocoder,AMap.CircleEditor'
    console.log(script)
    script.onerror = e => reject(e)
    script.onload = () => resolve(script)
    document.head.appendChild(script)
  })
}