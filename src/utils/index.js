import axios from "axios";

export const imageUpload = async imageData => {
    const fromData = new FormData()
    fromData.append('image', imageData)

    const imageKey = import.meta.env.VITE_IMGBB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;

    const { data } = await axios.post(url,
        fromData
    )

    return data?.data?.display_url

}


// upload image using cloudinary
// example post endpoint :  https://api.cloudinary.com/v1_1//</resource_type>/upload



export const imageUploadCloudinary = async imageData => {
    const fromData = new FormData()
    fromData.append('file', imageData)
    fromData.append(
        'upload_preset',
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    )

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const { data } = await axios.post(url,
        fromData
    )

    return data.secure_url

}




export const saveOrUpdateUser = async userdata => {
    const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`, userdata
    )
    return data

}


export const getEventStatus = (eventDate) => {
    const now = new Date()
    const eventTime = new Date(eventDate)

    const nowDate = now.toDateString()
    const eventDateStr = eventTime.toDateString()

    if (eventDateStr === nowDate) {
        return "running"
    } else if (eventTime > now) {
        return "upcoming"
    } else {
        return "finished"
    }
}