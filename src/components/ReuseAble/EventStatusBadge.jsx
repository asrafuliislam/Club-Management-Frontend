import Tag from "./Tag";

const EventStatusBadge = ({ date }) => {
    const isPast = new Date(date) < new Date()
    return isPast
        ? <Tag color="gray">Ended</Tag>
        : <Tag color="indigo">🕐 Upcoming</Tag>
}
export default EventStatusBadge;