class Dev
{
    constructor(name,github_user,bio,avatar_url,techs,location)
    {
        this.name = name ? name : github_user;
        this.github_user = github_user;
        this.bio = bio;
        this.avatar_url = avatar_url;
        this.techs = techs; 
        this.location = new UserLocation(location.type,location.coordinates);
    }
}
class UserLocation 
{
    constructor
    (
        type,
        coordinates
    )
    {
        this.type = type ? type : "Point";
        this.coordinates = coordinates;
    }
}
export default Dev;