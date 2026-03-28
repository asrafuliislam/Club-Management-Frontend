import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp, BsCreditCard, BsBuilding, BsPersonCheck } from 'react-icons/bs'

const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        Overview
      </p>
      <MenuItem
        icon={BsGraphUp}
        label="Overview"
        address="admin-Statistics"
      />

      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        Management
      </p>
      <MenuItem icon={FaUserCog} label="Manage Users" address="Manage-Users" />
      <MenuItem icon={BsBuilding} label="Clubs" address="clubs" />
      <MenuItem icon={BsCreditCard} label="Payments" address="payments" />
      <MenuItem icon={BsPersonCheck} label="User Requests" address="user-request" />
    </div>
  )
}

export default AdminMenu