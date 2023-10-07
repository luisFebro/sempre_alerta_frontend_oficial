// ref: https://support.cloudinary.com/hc/en-us/community/posts/360009732980-Get-thumbnail-from-uploaded-video

export default function convertVideoToThumbnail(videoUrl) {
    if (!videoUrl || typeof videoUrl !== "string") return null;

    return videoUrl.replace(".mp4", ".jpg");
}
