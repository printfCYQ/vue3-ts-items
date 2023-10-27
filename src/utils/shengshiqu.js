import area from '../../public/json/area.json'
import city from '../../public/json/city.json'
import province from '../../public/json/province.json'
import street from '../../public/json/street.json'

const list = province.map(provinceItem => ({
  ...provinceItem,
  children: city[provinceItem.id].map(cityItem => ({
    ...cityItem,
    children: area[cityItem.id].map(areaItem => {
      return {
        ...areaItem,
        children: street[areaItem.id]
      }
    })
  }))
}))

console.log(list)
export default list
