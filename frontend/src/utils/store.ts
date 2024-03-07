/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type Announcment = {
   title: string;
   description: string;
   creator: string;
   seen: boolean;
};

type SubmissionType = {
   marksObtained: number;
   submittedAnswersIndex: [];
   submittedAt: string;
   test: string;
};

// user Types
export type UserType = {
   _id: string;
   name: string;
   email: string;
   username: string;
   role: string;
   academicYear: string;
   stream: string;
   pursuingYear: string;
   subjectScore: number;
   submissions: SubmissionType[];
   bookmark: string[];
   token: string;
   linkedinUrl: string;
   githubUrl: string;
   twitterUrl: string;
   announcements: Announcment[];
};

const defaultParam: UserType = {
   _id: '',
   name: '',
   email: '',
   username: '',
   role: '',
   academicYear: '',
   stream: '',
   pursuingYear: '',
   bookmark: [],
   subjectScore: 0,
   submissions: [],
   token: '',
   linkedinUrl: '',
   githubUrl: '',
   twitterUrl: '',
   announcements: [],
};

type UserDetailsFnType = {
   user: UserType;
   setUserDetails: (userDetails: UserType) => void;
   logoutUser: () => void;
   bookmarkUpdate: (_id: string) => void;
   removeFromBookMark: (_id: string) => void;
   updateprofile: (user1: updateProfileDetails) => void;
   updateAnnouncement: (announcement: Announcment) => void;
   handleAllSeenZustand: () => void;
};

export type updateProfileDetails = {
   name: string;
   email: string;
   username: string;
   linkedinUrl: string;
   githubUrl: string;
   twitterUrl: string;
};

export const useUserDetails = create<UserDetailsFnType>((set) => {
   const storedUserDetails = sessionStorage.getItem('userDetails');
   return {
      user: storedUserDetails ? JSON.parse(storedUserDetails) : defaultParam,
      setUserDetails: (userDetails: UserType) =>
         set(() => {
            sessionStorage.removeItem('userDetails');
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
            return {
               user: userDetails,
            };
         }),

      logoutUser: () =>
         set(() => {
            sessionStorage.removeItem('userDetails');
            return {
               user: defaultParam,
            };
         }),

      bookmarkUpdate: (_id: string) =>
         set((state) => {
            state.user.bookmark.push(_id);
            sessionStorage.removeItem('userDetails');
            sessionStorage.setItem('userDetails', JSON.stringify(state.user));
            return {
               user: state.user,
            };
         }),

      removeFromBookMark: (_id: string) =>
         set((state) => {
            const indexOfTestId = state.user.bookmark.indexOf(_id);
            state.user.bookmark.splice(indexOfTestId, 1);
            sessionStorage.removeItem('userDetails');
            sessionStorage.setItem('userDetails', JSON.stringify(state.user));
            return {
               user: state.user,
            };
         }),

      updateprofile: (user1: updateProfileDetails) =>
         set((state) => {
            sessionStorage.removeItem('userDetails');
            sessionStorage.setItem(
               'userDetails',
               JSON.stringify({
                  ...user1,
                  _id: state.user._id,
                  role: state.user.role,
                  bookmark: state.user.bookmark,
                  token: state.user.token,
                  announcements: state.user.announcements,
               })
            );
            return {
               user: {
                  ...user1,
                  _id: state.user._id,
                  role: state.user.role,
                  bookmark: state.user.bookmark,
                  token: state.user.token,
                  announcements: state.user.announcements,
                  academicYear: state.user.academicYear,
                  pursuingYear: state.user.pursuingYear,
                  stream: state.user.stream,
                  subjectScore: state.user.subjectScore,
                  submissions: state.user.submissions,
               },
            };
         }),

      updateAnnouncement: (announcement: Announcment) =>
         set((state) => {
            state.user.announcements.push(announcement);
            sessionStorage.removeItem('userDetails');
            sessionStorage.setItem('userDetails', JSON.stringify(state.user));
            return {
               user: state.user,
            };
         }),

      handleAllSeenZustand: () =>
         set((state) => {
            state.user.announcements.map((ann) => {
               ann.seen = true;
            });
            return {
               user: state.user,
            };
         }),
   };
});
