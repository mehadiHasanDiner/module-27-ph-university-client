import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const allAcademicFaculties = useGetAllFacultiesQuery(undefined);
  console.log(allAcademicFaculties.currentData);
  return (
    <div>
      <h1>Academic Faculty</h1>
    </div>
  );
};

export default AcademicFaculty;
