export const formatTasks = obj => {
const result = [];
Object.values(obj).forEach(task =>
 Object.entries(task).forEach(([key, value]) =>
   result.push({ name: key, data: value })
));
  return result;
}
