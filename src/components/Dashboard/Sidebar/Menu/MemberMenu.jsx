import { BsFingerprint, BsBuilding, BsCalendarEvent, BsCreditCard2Back } from 'react-icons/bs'
import MenuItem from './MenuItem'

const MemberMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        Overview
      </p>
      <MenuItem
        icon={BsFingerprint}
        label="Member Overview"
        address="member-statistics"
      />

      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-3 pt-3 pb-1">
        My Activity
      </p>
      <MenuItem
        icon={BsBuilding}
        label="My Clubs"
        address="my-joined-clubs"
      />
      <MenuItem
        icon={BsCalendarEvent}
        label="My Events"
        address="my-events"
      />
      <MenuItem
        icon={BsCreditCard2Back}
        label="Payment History"
        address="payment-history"
      />
    </div>
  )
}

export default MemberMenu