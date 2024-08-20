import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManage";

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);

  const singleObject = offeredCourseData?.data?.reduce((acc, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].section.push({ section: item.section, id: item._id });

    acc["courseTitle"] = "React";
    return acc;
  }, {});

  console.log(Object.values(singleObject ? singleObject : {}));

  return (
    <div>
      <h1>This is Offered course component</h1>
    </div>
  );
};

export default OfferedCourse;
