import { requests } from "../Api/requests";
import { ProfileDto } from "../dto/ProfileDto";

// Get the profile that is currently logged in (stored in localStorage).
export function getProfile(): ProfileDto {
  return JSON.parse(localStorage.getItem("profile")!) as ProfileDto
}

// Load a profile into `localStorage` if `email` and `password` are correct.
// Returns `true` if successful.
export async function loadProfile(email: String, password: String): Promise<ProfileDto> {
  
  console.log(`in 'loadProfile' @ profile.ts  -- with email = ${email} and password = ${password}`);
  
  const fetchedProfile = (await requests.getProfile(email, password)) as ProfileDto;
  
  console.log(`did fetch: ${fetchedProfile}`);
  
  if (fetchedProfile) {
    localStorage.clear();
    const stringified = JSON.stringify(fetchedProfile);
    localStorage.setItem("profile", stringified);
    
    console.log(`stringified: ${stringified}`);
    
  } else {
    console.log("Login failed.")
  }
  
  return fetchedProfile;
  
}

export async function reloadProfile() {
  let profile = getProfile();
  await loadProfile(profile.email, profile.password);
}
