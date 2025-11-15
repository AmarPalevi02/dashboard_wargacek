import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Laporan } from "../../pages/Laporants/types";
import { useLaporanData } from "../../pages/Laporants/useLaporanData";
import { config } from "../../configs/configs";
import { useSidebar } from "../../context/SidebarContext";

interface MapWithReportsProps {
  laporanData: Laporan;
  center?: LatLngExpression;
  zoom?: number;
}

const DemographicCard: React.FC<MapWithReportsProps> = ({
  center = [-7.312241432992085, 112.7411839224813],
  zoom = 13,
}) => {
  const { laporanData } = useLaporanData();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[359px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: "500px", width: "100%" }}
            className={`rounded-lg border border-gray-200 dark:border-gray-700 z-1`}
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
                        <p className="text-sm font-medium">
                          {laporan.User.username}
                        </p>
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
                        <span className="text-xs text-gray-500">
                          Deskripsi:
                        </span>
                        <p className="text-sm line-clamp-2">
                          {laporan.deskripsi}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500">Status:</span>
                        <p className="text-sm font-medium">
                          {
                            laporan.statuses[laporan.statuses.length - 1]
                              ?.status
                          }
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
        </div>
      </div>
    </div>
  );
};

export default DemographicCard;
