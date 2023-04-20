import request from "./request";
import type {
  AReGeoParams,
  BReGeoParams,
  BReGeoRes,
  AReGeoRes,
} from "./baiduMap.d.ts";

export let baiduMapKey = "";
export const baiduMapUrl = "https://api.map.baidu.com";

const AMapToBMapAdapter = {
  reGeoParams: (params: AReGeoParams): BReGeoParams => {
    const temp = { ...params };
    temp.location = params.location.split(",").reverse().join(",");
    temp.ak = baiduMapKey;
    temp.output = "json";
    return temp;
  },
  reGeoResult: (input: BReGeoRes): AReGeoRes | undefined => {
    if (input.status === 0) {
      return {
        status: "1",
        regeocode: {
          formatted_address: input?.result?.formatted_address || "",
          addressComponent: {
            adcode: input?.result?.addressComponent?.adcode || "",
            citycode: `${input?.result?.cityCode || ""}`,
            province: input?.result?.addressComponent?.province || "",
          },
        },
      };
    }
    return undefined;
  },
};

const reGeo = async (params: AReGeoParams): Promise<AReGeoRes | undefined> => {
  const res: BReGeoRes = await request.get(
    `${baiduMapUrl}/reverse_geocoding/v3`,
    AMapToBMapAdapter.reGeoParams(params),
    {},
    { simple: false }
  );
  return AMapToBMapAdapter.reGeoResult(res);
};

export type LocationInfo = Record<"address" | "province" | "adcode", string>;
export const getUserLocation: ({
  key,
  normalizeLocation,
}: {
  key: string;
  normalizeLocation: Function;
}) => Promise<LocationInfo> = async ({ key, normalizeLocation }) => {
  baiduMapKey = key;

  const locInfo: any = await uni.getLocation({
    type: "gcj02",
    isHighAccuracy: true,
  });
  let [longitude, latitude] = normalizeLocation([
    locInfo.longitude,
    locInfo.latitude,
  ]);
  const location = `${longitude},${latitude}`;
  const geoInfo = await reGeo({
    location,
  });
  const { adcode, province } = geoInfo.regeocode.addressComponent;
  const address = geoInfo.regeocode.formatted_address;

  return { address, province, adcode };
};
