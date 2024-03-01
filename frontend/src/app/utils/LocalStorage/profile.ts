import { requests } from "../Api/requests";
import { ProfileDto } from "../dto/ProfileDto";

// Get the profile that is currently logged in (stored in localStorage).
export function getProfile(): ProfileDto {
  return JSON.parse(localStorage.getItem("profile")!) as ProfileDto
}

// Load a profile into `localStorage` if `email` and `password` are correct.
// Returns `true` if successful.
export async function loadProfile(email: String, password: String): Promise<ProfileDto> {
  
  const fetchedProfile = (await requests.getProfile(email, password)) as ProfileDto;
  
  if (fetchedProfile) {
    logOut();
    localStorage.setItem("profile", JSON.stringify(fetchedProfile) );
  } else {
    console.log("Login failed.")
  }
  
  return fetchedProfile;
  
}

// Refreshes the currently loaded profile.
export async function reloadProfile() {
  let profile = getProfile();
  await loadProfile(profile.email, profile.password);
}

// Logs out of the currently loaded profile by clearing localStorage.
export function logOut() {
  localStorage.clear();
}
