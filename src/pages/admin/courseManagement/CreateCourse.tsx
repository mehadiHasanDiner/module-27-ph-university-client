import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import PHInput from "../../../components/form/PHInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCourseOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating .......");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourse: data.preRequisiteCourse
        ? data.preRequisiteCourse?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester Created successfully", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHForm onSubmit={onSubmit}>
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="prefix" />
            <PHInput type="text" name="code" label="Code" />
            <PHInput type="text" name="credits" label="Credits" />
            <PHSelect
              mode="multiple"
              options={preRequisiteCourseOptions}
              name="preRequisiteCourse"
              label="Pre-requisite Course"
            />

            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateCourse;
