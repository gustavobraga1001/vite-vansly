import { createContext, useState } from "react";
import Api from "../AuthProvider/services/api";

export const AnnouncementContext = createContext({})

// eslint-disable-next-line react/prop-types
export function AnnouncementsProvider({ children }) {
  const [announcementDriver, setAnnouncementDriver] = useState([])

  async function loadAnnouncementDriver(driverId) {
    const response = await Api.get(`/get-announcement-driver/${driverId}`)
    setAnnouncementDriver(response.data.announcement)
  }

  // useEffect(() => {
  //   loadAnnouncementDriver()
  // }, [])

  return (
    <AnnouncementContext.Provider value={{ announcementDriver, loadAnnouncementDriver }}>
      {children}
    </AnnouncementContext.Provider>
  )
}