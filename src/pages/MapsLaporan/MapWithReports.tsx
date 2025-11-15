// components/MapWithReports.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Laporan } from "../Laporants/types";
import { config } from "../../configs/configs";

interface MapWithReportsProps {
  laporanData: Laporan[];
  center?: LatLngExpression;
  zoom?: number;
}

const MapWithReports: React.FC<MapWithReportsProps> = ({
  laporanData,
  center = [-6.2088, 106.8456],
  zoom = 13,
}) => {


  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "100%" }}
      className="rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {laporanData.map((laporan) => (
        <Marker
          key={laporan.id}
          position={[laporan.latitude, laporan.longitude]}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-semibold text-gray-800 mb-2">
                Laporan Kerusakan
              </h3>

              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">Pelapor:</span>
                  <p className="text-sm font-medium">{laporan.User.username}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">
                    Jenis Kerusakan:
                  </span>
                  <p className="text-sm">
                    {laporan.jenisKerusakan.jenis_kerusakan}
                  </p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Lokasi:</span>
                  <p className="text-sm">{laporan.location}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Deskripsi:</span>
                  <p className="text-sm line-clamp-2">{laporan.deskripsi}</p>
                </div>

                <div>
                  <span className="text-xs text-gray-500">Status:</span>
                  <p className="text-sm font-medium">
                    {laporan.statuses[laporan.statuses.length - 1]?.status}
                  </p>
                </div>

                {laporan.foto_url && (
                  <div>
                    <span className="text-xs text-gray-500">Foto:</span>
                    <img
                      src={`${config.base_url}${laporan.foto_url}`}
                      alt="Foto laporan"
                      className="w-full h-20 object-cover rounded mt-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithReports;
