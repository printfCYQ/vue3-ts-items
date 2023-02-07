<template>
    <div class="map-content">
        <div id="container"></div>
        <div class="input-card" style="width: 35rem">
            <div class="form-item">
                <span class="item-label">经纬度:</span>
                <div class="item-warp">
                    <input class="item-input" type="text" v-model="form.point" placeholder="例：121.484236,38.855603" />
                    <div class="item-btn" id="regeo" @click="getAddressByPointHandle">转地址</div>
                </div>
            </div>
            <div class="form-item">
                <span class="item-label">地址:</span>
                <div class="item-warp">
                    <input class="item-input" type="text" v-model="form.address" placeholder="例：北京火车站" />
                    <div id="geo" class="item-btn" @click="getPointByAddressHandle">转经纬度</div>
                </div>
            </div>
            <div class="form-item">
                <span class="item-label">范围:</span>
                <div class="item-warp">
                    <input class="item-input" type="text" v-model="form.range" placeholder="例：300" />
                    <div id="circle" class="item-btn" @click="drawCircleHandle">确认</div>
                </div>
            </div>
            提示：{{ tips }}
        </div>
        <div v-if="darwing" class="mask"></div>
    </div>
</template>

<script setup lang="ts">
import * as mapUtils from '@/utils/gdMap'

const tips = ref<string>('加载ing')
const map = ref() // 地图
const marker = ref() // 标点
const circle = ref() // 圆形

const darwing = ref<boolean>(false) // 加载ing

const form = reactive<{
    point: string,
    address: string,
    range: string
}>({
    point: '',
    address: '',
    range: ''
})

// 绘制地图
const drawMap = () => {
    return new Promise((resolve, reject) => {
        map.value = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 17 // 级别
        })
        if (map.value) {
            clickOnMap()
            resolve(true)
        } else {
            reject('drawMap失败')
        }
    })
}

// 绘制标点
const drawMarker = (lng: number, lat: number) => {
    marker.value = new AMap.Marker()
    map.value.add(marker.value)
    marker.value.setPosition([lng, lat])
}

// 地图点击事件
const clickOnMap = () => {
    map.value.on('click', (e: any) => {
        console.log(e)
        marker.value && map.value.remove(marker.value);
        circle.value && map.value.remove(circle.value);
        drawMarker(e.lnglat.lng, e.lnglat.lat)
        getAddressByPoint(e.lnglat.lng, e.lnglat.lat)
        form.point = e.lnglat.lng + ',' + e.lnglat.lat
    })
}

// 定位
const geolocation = () => {
    var options = {
        showButton: true, // 是否显示定位按钮
        position: 'LB', // 定位按钮的位置 /* LT LB RT RB */
        offset: [10, 20], // 定位按钮距离对应角落的距离
        showMarker: true, // 是否显示定位点
        showCircle: false
    }
    return new Promise((resolve, reject) => {
        AMap.plugin(['AMap.Geolocation'], () => {
            var geolocation = new AMap.Geolocation(options)
            map.value.addControl(geolocation)
            geolocation.getCurrentPosition(function (status: any, result: any) {
                if (status === 'complete') {
                    form.point = result.position.lng + ',' + result.position.lat
                    getAddressByPoint(result.position.lng, result.position.lat)
                    drawMarker(result.position.lng, result.position.lat)
                    tips.value = '定位成功'
                    resolve(result)
                } else {
                    tips.value = '定位失败了，请手动输入'
                    reject(result)
                }
            })
        })
    })
}

// 通过地址获取坐标
const getPointByAddress = (address: string) => {
    const geocoder = new AMap.Geocoder()
    geocoder.getLocation(address, (status: any, result: any) => {
        if (status === 'complete' && result.geocodes.length) {
            form.point = result.geocodes[0].location.lng + ',' + result.geocodes[0].location.lat
            map.value.setCenter([result.geocodes[0].location.lng, result.geocodes[0].location.lat])
            marker.value && map.value.remove(marker.value);
            drawMarker(result.geocodes[0].location.lng, result.geocodes[0].location.lat)
            map.value.setFitView(marker.value)
        } else {
            console.error('根据地址查询位置失败')
        }
    })
}

// 通过坐标获取地址
const getAddressByPoint = (lng: number, lat: number) => {
    const geocoder = new AMap.Geocoder()
    geocoder.getAddress([lng, lat], (status: any, result: any) => {
        if (status === 'complete' && result.regeocode) {
            form.address = result.regeocode.formattedAddress
            map.value.setCenter([lng, lat])
            marker.value && map.value.remove(marker.value);
            drawMarker(lng, lat)
        } else {
            console.error('根据经纬度查询地址失败')
        }
    })
}

// 在地图上画圆
const drawCircle = (range: number, lng: number, lat: number) => {
    circle.value && map.value.remove(circle.value)
    if (!range) {
        console.error('请输入范围')
        return
    }
    if (typeof Number(range) !== 'number') {
        console.error('范围请输入数字')
        return
    }
    circle.value = new AMap.Circle({
        center: [lng, lat],
        radius: Number(range), // 半径
        borderWeight: 3,
        strokeColor: '#FF33FF',
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: 'dashed',
        strokeDasharray: [10, 10],
        // 线样式还支持 'dashed'
        fillColor: '#1791fc',
        zIndex: 50
    })

    map.value.add(circle.value)
    // 缩放地图到合适的视野级别
    map.value.setFitView([circle.value])
}

// 按钮 - 转地址
const getAddressByPointHandle = () => {
    const lnglat = form.point.split(',')
    circle.value && map.value.remove(circle.value)
    getAddressByPoint(Number(lnglat[0]), Number(lnglat[1]))
}

// 按钮 - 转经纬度
const getPointByAddressHandle = () => {
    circle.value && map.value.remove(circle.value)
    getPointByAddress(form.address)
}

// 按钮 - 范围确认
const drawCircleHandle = () => {
    const lnglat = form.point.split(',')
    drawCircle(Number(form.range), Number(lnglat[0]), Number(lnglat[1]))
}
onMounted(async () => {
    try {
        darwing.value = true
        await mapUtils.AMapGeocoder()  // 加载 js
        await drawMap() // 绘制地图
        await geolocation() // 定位
    } catch (error) {
        darwing.value = false
    }
    darwing.value = false
})
</script>

<style lang="scss">
.map-content {
    position: relative;
    width: 100vw;
    height: 100vh;

    #container {
        width: 100%;
        height: 100%;
    }

    .input-card {
        position: absolute;
        top: 1rem;
        bottom: revert-layer;
        width: 28rem;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border-radius: 0.25rem;
        width: 22rem;
        border-width: 0;
        border-radius: 0.4rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
        right: 1rem;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 0.75rem 1.25rem;

        .form-item {
            display: flex;
            align-items: center;
            margin-top: 0.5rem;

            .item-label {
                width: 4rem;
                text-align: right;
            }

            .item-warp {
                flex: 1;
                display: flex;
                margin-left: 1rem;
                justify-content: space-between;
                align-items: center;

                .item-input {
                    flex: 1;
                    width: 100%;
                    line-height: 1.5;
                    padding: 0.25rem;
                    color: #495057;
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                }

                .item-input:focus {
                    border-color: #80bdff;
                    outline: 0;
                    box-shadow: 0 0 0 0.1rem rgba(128, 189, 255, 0.1);
                }

                .item-btn {
                    width: 6rem;
                    margin-left: 1rem;
                    border: 1px solid #ced4da;
                    color: #495057;
                    padding: 0.25rem;
                    text-align: center;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    user-select: none;
                }

                .item-btn:hover {
                    text-decoration: none;
                    color: #fff;
                    background-color: #25a5f7;
                    border-color: #25a5f7;
                }
            }
        }
    }

    .mask {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #3a3c3d75;
    }
}
</style>