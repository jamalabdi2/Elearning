import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import avatarIcon from "../assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoaderUser] = useState(false);
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const {} = useLoadUserQuery(undefined, { skip: true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (isSuccess || success) {
      setLoaderUser(true);
    }
    if (error || updateError) {
      console.log(error);
    }
    if(success){
      toast.success("Profile updated successfull!")
    }
  }, [isSuccess, error,success,updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");
    if(name !== ""){
      await editProfile({
        name: user.name,
      });
    }
    
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative">
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
          alt="Avatar"
          width={120}
          height={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
        />
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="text-white" />
          </div>
        </label>
      </div>
      <div className="w-full pl-6 800px:pl-10 mt-6">
        <form onSubmit={handleSubmit} className="w-full max-w-[800px] mx-auto">
          <div className="pb-4">
            <div className="w-full mb-4">
              <label htmlFor="name" className="block pb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} w-full`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full pt-2">
              <label htmlFor="email" className="block pb-2">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                readOnly
                className={`${styles.input} w-full`}
                required
                value={user?.email}
              />
            </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
