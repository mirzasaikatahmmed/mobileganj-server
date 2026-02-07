import { ReactNode } from "react"
import Header from "@/components/shared/main/Header"
import Footer from "@/components/shared/main/Footer"
import FloatingContact from "@/components/shared/main/FloatingContact"
import BottomNav from "@/components/shared/BottomNav"

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
      <FloatingContact />
      <BottomNav />
    </div>
  )
}

export default MainLayout