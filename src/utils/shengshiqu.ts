import areaJson from '../../public/json/area.json'
import cityJson from '../../public/json/city.json'
import provinceJson from '../../public/json/province.json'
import streetJson from '../../public/json/street.json'


const area:any = areaJson
const city:any = cityJson
const province:any = provinceJson
const street:any = streetJson

const list = province.map((provinceItem:any) => ({
  ...provinceItem,
  children: city[provinceItem.id].map((cityItem:any) => ({
    ...cityItem,
    children: area[cityItem.id].map((areaItem:any) => {
      return {
        ...areaItem,
        children: street[areaItem.id]
      }
    })
  }))
}))

export default list
