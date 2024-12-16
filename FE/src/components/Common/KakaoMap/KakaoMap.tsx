import { useEffect } from "react";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kakao: any;
    }
}
interface KakaoMapProps {
    lat: number;
    lng: number;
}

const KakaoMap = ({lat, lng}: KakaoMapProps) => {
    useEffect(() => {
        const container = document.getElementById(`map`);
        const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);

        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
        });marker.setMap(map);
    }, [lat, lng]);

    return <div id="map" style={{ width: "100%", height: "200px" }} />;
};

export default KakaoMap;
