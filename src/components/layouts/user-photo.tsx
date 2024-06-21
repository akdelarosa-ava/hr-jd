import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils';
import { AccountInfo } from '@azure/msal-browser';
import { extractInitials } from '@/msal/user-helper';
import { getUserPhotoAvatar } from '@/msal/msal-graph';

type Props = {
    className?: string;
    user: AccountInfo | null
}
const UserPhoto = ({user, className}: Props) => {
  const initials = extractInitials(user?.name);
	
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src="/profile_img.jpg" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

export default UserPhoto