import { BsFillHouseAddFill, BsPeopleFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory, MdOutlineEventNote } from 'react-icons/md'
import MenuItem from './MenuItem'

const ManagerMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        Overview
      </p>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Manage Overview"
        address="manager-statistics"
      />

      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        My Club
      </p>
      <MenuItem
        icon={MdHomeWork}
        label="Manage Club"
        address="manage-club"
      />
      <MenuItem
        icon={BsPeopleFill}
        label="Members"
        address="member"
      />
      <MenuItem
        icon={MdOutlineEventNote}
        label="Events"
        address="events"
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Registrations"
        address="registrations"
      />
    </div>
  )
}

export default ManagerMenu