import { createDb } from "./db";
import { RepositoryHubFactory } from "./repositories";
import { EmployeeWithCity, EmployeeWithPosition } from "./repositories/types";

const citySource = [
  { uuid: "3ba648aa-4498-43da-b29f-b83f37a25429", name: "Алматы" },
  { uuid: "32d82d73-3eac-4e5a-9921-fcd2e1447c76", name: "Астана" },
];

const divisionSource = [
  {
    uuid: "97cf9556-2882-4c4a-b7b5-37cf53347447",
    name: "Департамент информационных технологий",
    cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
  },
  {
    uuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
    name: "Дирекция",
    cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
  },
];

const positionSource = [
  {
    uuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
    name: "Руководитель службы поддержки",
  },
  { uuid: "cc811dfb-7f73-4c18-969f-c8408fd92263", name: "Разработчик" },
];

const employeeSource = [
  {
    uuid: "65f5c1d4-fb87-4da2-b0bd-a22343605396",
    firstName: "Name 1",
    lastName: "Name 2",
    divisionUuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
    cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
    positionUuid: "cc811dfb-7f73-4c18-969f-c8408fd92263",
  },
  {
    uuid: "59e23b74-8645-46d6-9751-5fe594dd89e6",
    firstName: "Name 1",
    lastName: "Name 2",
    divisionUuid: "3e80754a-3681-4e5c-8d6d-b84d09a7a3c4",
    cityUuid: "3ba648aa-4498-43da-b29f-b83f37a25429",
    positionUuid: "cc811dfb-7f73-4c18-969f-c8408fd92263",
  },
];


export interface IHRApp {
  employeeWithCityList: () => Promise<{ firstName: string; city: string }[]>;
  employeeWithPositionList: () => Promise<{
    firstName: string;
    position: string;
    division: string;
  }[]>;
  update: (args: {
    entity: "employee" | "city" | "position" | "division";
    data: object;
  }) => Promise<void>;
}

export const createHRApp = (): IHRApp => {
  const db = createDb();
  const hub = RepositoryHubFactory.build(db);

  return {
    employeeWithCityList: async (): Promise<EmployeeWithCity[]> => {
      const employees = await hub.employee.query({ where: {} });

      return employees.map(employee => ({
        firstName: employee.data.firstName,
        city: employee.data.cityName,
      }));
    },
    employeeWithPositionList: async (): Promise<EmployeeWithPosition[]> => {
      const employees = await hub.employee.query({ where: {} });

      return employees.map(employee => ({
        firstName: employee.data.firstName,
        position: employee.data.positionName,
        division: employee.data.divisionName,
      }));
    },
    update: async () => {
      // этот метод имплементировать не нужно
    },
  };
};
