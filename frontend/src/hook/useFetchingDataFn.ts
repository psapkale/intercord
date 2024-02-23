import axios from 'axios';
import { useState } from 'react';

const useFetchingDataFn = () => {
   const [selectedOptionField, setSelectedOptionField] =
      useState<string>('all');
   const [isRankingOpen, setIsRankingOpen] = useState(false);
   //   const [loadingData, setLoadingData] = useState(false);
   const [allStudents, setAllStudents] = useState();

   const getAllTestBySelectedSubject = () => {
      console.log('Get all Test');
   };

   const getRankingOfStudentBySubject = () => {
      console.log('Whole subject Ranking');
   };

   const getAllStudentRanking = async () => {};

   const getRankingByTest = (testId: string) => {
      console.log(testId);
      setIsRankingOpen(true);
   };

   return {
      setSelectedOptionField,
      setIsRankingOpen,
      getAllTestBySelectedSubject,
      getRankingOfStudentBySubject,
      getAllStudentRanking,
      getRankingByTest,
      selectedOptionField,
      isRankingOpen,
   };
};

export default useFetchingDataFn;
