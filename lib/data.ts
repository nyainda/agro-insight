import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Animal {
  id: string;
  farmId: string; // Add farmId to isolate data
  name: string;
  species: 'cow' | 'pig' | 'chicken' | 'sheep' | 'goat' | 'horse';
  breed: string;
  gender: 'male' | 'female';
  birthDate: string;
  weight: number;
  healthScore: number;
  status: 'healthy' | 'sick' | 'pregnant' | 'quarantine' | 'treatment';
  location: string;
  motherId?: string;
  fatherId?: string;
  image?: string;
  notes: string;
  vaccinations: Vaccination[];
  treatments: Treatment[];
  rfidTag?: string;
  earTag?: string;
  microchipId?: string;
  qrCode?: string;
  measurements: Measurement[];
  createdAt: string;
  updatedAt: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  nextDue: string;
  veterinarian: string;
  notes: string;
}

export interface Treatment {
  id: string;
  condition: string;
  medication: string;
  startDate: string;
  endDate: string;
  veterinarian: string;
  notes: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Measurement {
  id: string;
  type: 'weight' | 'height' | 'temperature' | 'heart_rate' | 'milk_production';
  value: number;
  unit: string;
  date: string;
  notes?: string;
}

export interface Task {
  id: string;
  farmId: string; // Add farmId to isolate data
  title: string;
  description: string;
  type: 'feeding' | 'health' | 'breeding' | 'maintenance' | 'other' | 'management';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  dueDate: string;
  animalId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: string;
  farmId: string; // Add farmId to isolate data
  name: string;
  category: 'feed' | 'medicine' | 'equipment' | 'supplies';
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  supplier: string;
  expiryDate?: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthRecord {
  id: string;
  farmId: string; // Add farmId to isolate data
  animalId: string;
  date: string;
  healthScore: number;
  temperature?: number;
  weight?: number;
  notes: string;
  veterinarian?: string;
  createdAt: string;
}

export interface FeedingRecord {
  id: string;
  farmId: string; // Add farmId to isolate data
  animalId: string;
  feedType: string;
  amount: number;
  unit: string;
  feedingTime: string;
  cost: number;
  notes: string;
  createdAt: string;
}

export interface BreedingRecord {
  id: string;
  farmId: string; // Add farmId to isolate data
  femaleId: string;
  maleId: string;
  breedingDate: string;
  method: 'natural' | 'ai' | 'embryo';
  expectedDueDate?: string;
  status: 'planned' | 'completed' | 'successful' | 'failed';
  notes: string;
  createdAt: string;
}

export interface ProductionRecord {
  id: string;
  farmId: string; // Add farmId to isolate data
  animalId: string;
  productType: 'milk' | 'eggs' | 'meat' | 'wool' | 'honey' | 'cheese';
  quantity: number;
  unit: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  date: string;
  notes: string;
  createdAt: string;
}

export interface StaffMember {
  id: string;
  farmId: string; // Add farmId to isolate data
  name: string;
  email: string;
  role: 'manager' | 'worker' | 'veterinarian' | 'supervisor';
  department: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
  hireDate: string;
  permissions: string[];
  hoursWorked: number;
  performance: number;
  location: string;
  salary?: number;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

interface DataState {
  animals: Animal[];
  tasks: Task[];
  inventory: InventoryItem[];
  healthRecords: HealthRecord[];
  feedingRecords: FeedingRecord[];
  breedingRecords: BreedingRecord[];
  productionRecords: ProductionRecord[];
  staff: StaffMember[];

  // Animal operations
  addAnimal: (animal: Omit<Animal, 'id' | 'farmId' | 'createdAt' | 'updatedAt'>) => void;
  updateAnimal: (id: string, animal: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;

  // Task operations
  addTask: (task: Omit<Task, 'id' | 'farmId' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Inventory operations
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'farmId' | 'createdAt' | 'updatedAt'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;

  // Health record operations
  addHealthRecord: (record: Omit<HealthRecord, 'id' | 'farmId' | 'createdAt'>) => void;
  updateHealthRecord: (id: string, record: Partial<HealthRecord>) => void;
  deleteHealthRecord: (id: string) => void;

  // Feeding record operations
  addFeedingRecord: (record: Omit<FeedingRecord, 'id' | 'farmId' | 'createdAt'>) => void;
  updateFeedingRecord: (id: string, record: Partial<FeedingRecord>) => void;
  deleteFeedingRecord: (id: string) => void;

  // Breeding record operations
  addBreedingRecord: (record: Omit<BreedingRecord, 'id' | 'farmId' | 'createdAt'>) => void;
  updateBreedingRecord: (id: string, record: Partial<BreedingRecord>) => void;
  deleteBreedingRecord: (id: string) => void;

  // Production record operations
  addProductionRecord: (record: Omit<ProductionRecord, 'id' | 'farmId' | 'createdAt'>) => void;
  updateProductionRecord: (id: string, record: Partial<ProductionRecord>) => void;
  deleteProductionRecord: (id: string) => void;

  // Staff operations
  addStaffMember: (staff: Omit<StaffMember, 'id' | 'farmId'>) => void;
  updateStaffMember: (id: string, staff: Partial<StaffMember>) => void;
  deleteStaffMember: (id: string) => void;

  // Measurement operations
  addMeasurement: (animalId: string, measurement: Omit<Measurement, 'id'>) => void;
  updateMeasurement: (animalId: string, measurementId: string, measurement: Partial<Measurement>) => void;
  deleteMeasurement: (animalId: string, measurementId: string) => void;
}

// Helper function to get current user's farm ID
const getCurrentFarmId = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const authState = JSON.parse(localStorage.getItem('auth-storage') || '{}');
    return authState?.state?.user?.farmId || null;
  } catch {
    return null;
  }
};

// Initialize with sample data for farm-1 only
const sampleAnimals: Animal[] = [
  {
    id: 'animal_001',
    farmId: 'farm_001',
    name: 'Bella',
    species: 'cow',
    breed: 'Holstein',
    gender: 'female',
    birthDate: '2020-03-15',
    weight: 550,
    healthScore: 95,
    status: 'healthy',
    location: 'Pasture A - North Field',
    motherId: 'animal_mother_001',
    fatherId: 'animal_father_001',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    measurements: [
      {
        id: 'measurement_001',
        type: 'weight',
        value: 550,
        unit: 'kg',
        date: '2024-01-15',
        notes: 'Regular monthly weigh-in - excellent condition'
      },
      {
        id: 'measurement_002',
        type: 'height',
        value: 142,
        unit: 'cm',
        date: '2024-01-15',
        notes: 'Shoulder height measurement'
      }
    ],
    notes: 'Top milk producer in the herd - 32L/day average. Excellent genetic markers for breeding.'
  },
  {
    id: 'animal_002',
    farmId: 'farm_001',
    name: 'Max',
    species: 'cow',
    breed: 'Angus',
    gender: 'male',
    birthDate: '2019-08-22',
    weight: 720,
    healthScore: 88,
    status: 'healthy',
    location: 'Barn 2 - Breeding Stall',
    motherId: null,
    fatherId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
    measurements: [
      {
        id: 'measurement_003',
        type: 'weight',
        value: 720,
        unit: 'kg',
        date: '2024-01-10',
        notes: 'Breeding bull weight check'
      }
    ],
    notes: 'Prize-winning Angus bull - 2023 County Fair Champion. Excellent breeding record with 94% conception rate.'
  },
  {
    id: 'animal_003',
    farmId: 'farm_001',
    name: 'Luna',
    species: 'cow',
    breed: 'Jersey',
    gender: 'female',
    birthDate: '2021-05-18',
    weight: 450,
    healthScore: 92,
    status: 'pregnant',
    location: 'Maternity Barn',
    motherId: 'animal_001',
    fatherId: 'animal_002',
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2024-01-18T09:15:00Z',
    measurements: [
      {
        id: 'measurement_004',
        type: 'weight',
        value: 450,
        unit: 'kg',
        date: '2024-01-18',
        notes: 'Pregnancy weight check - 6 months pregnant'
      }
    ],
    notes: 'Expecting first calf in March 2024. Showing excellent maternal instincts.'
  },
  {
    id: 'animal_004',
    farmId: 'farm_001',
    name: 'Charlie',
    species: 'cow',
    breed: 'Holstein',
    gender: 'male',
    birthDate: '2023-09-12',
    weight: 280,
    healthScore: 85,
    status: 'healthy',
    location: 'Calf Pen 1',
    motherId: 'animal_001',
    fatherId: 'animal_002',
    createdAt: '2023-09-12T08:30:00Z',
    updatedAt: '2024-01-20T11:45:00Z',
    measurements: [
      {
        id: 'measurement_005',
        type: 'weight',
        value: 280,
        unit: 'kg',
        date: '2024-01-20',
        notes: 'Growing well - gaining 1.2kg/day'
      }
    ],
    notes: 'Healthy young bull calf. Strong growth rate and good appetite.'
  },
  {
    id: 'animal_005',
    farmId: 'farm_001',
    name: 'Rosie',
    species: 'cow',
    breed: 'Simmental',
    gender: 'female',
    birthDate: '2020-11-03',
    weight: 580,
    healthScore: 65,
    status: 'treatment',
    location: 'Medical Pen',
    motherId: null,
    fatherId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-22T16:20:00Z',
    measurements: [
      {
        id: 'measurement_006',
        type: 'weight',
        value: 580,
        unit: 'kg',
        date: '2024-01-22',
        notes: 'Under treatment for mastitis'
      }
    ],
    notes: 'Currently receiving antibiotic treatment for mastitis. Veterinary check scheduled for tomorrow.'
  },
  {
    id: 'animal_006',
    farmId: 'farm_001',
    name: 'Thunder',
    species: 'cow',
    breed: 'Charolais',
    gender: 'male',
    birthDate: '2018-04-27',
    weight: 850,
    healthScore: 90,
    status: 'healthy',
    location: 'Pasture B - South Field',
    motherId: null,
    fatherId: null,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-19T13:10:00Z',
    measurements: [
      {
        id: 'measurement_007',
        type: 'weight',
        value: 850,
        unit: 'kg',
        date: '2024-01-19',
        notes: 'Mature breeding bull in excellent condition'
      }
    ],
    notes: 'Senior breeding bull with proven genetics. Father to 15 calves on the farm.'
  },
];

const sampleTasks: Task[] = [
  {
    id: 'task_001',
    farmId: 'farm_001',
    title: 'Vaccination for Bella',
    description: 'Annual vaccination booster shot - BVD, IBR, and PI3 combination vaccine',
    type: 'health',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Dr. Sarah Johnson',
    dueDate: '2024-02-01',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    animalId: 'animal_001'
  },
  {
    id: 'task_002',
    farmId: 'farm_001',
    title: 'Feed inventory check',
    description: 'Monthly feed stock assessment - check hay, grain, and mineral supplements',
    type: 'feeding',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Mike Wilson',
    dueDate: '2024-01-30',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-20T10:15:00Z',
    animalId: null
  },
  {
    id: 'task_003',
    farmId: 'farm_001',
    title: 'Mastitis treatment for Rosie',
    description: 'Administer antibiotic treatment and monitor milk quality',
    type: 'health',
    priority: 'urgent',
    status: 'in-progress',
    assignedTo: 'Dr. Sarah Johnson',
    dueDate: '2024-01-25',
    createdAt: '2024-01-22T16:20:00Z',
    updatedAt: '2024-01-23T08:30:00Z',
    animalId: 'animal_005'
  },
  {
    id: 'task_004',
    farmId: 'farm_001',
    title: 'Pregnancy check for Luna',
    description: 'Ultrasound examination to confirm pregnancy progress and calf health',
    type: 'breeding',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Dr. Sarah Johnson',
    dueDate: '2024-02-05',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
    animalId: 'animal_003'
  },
  {
    id: 'task_005',
    farmId: 'farm_001',
    title: 'Pasture rotation',
    description: 'Move cattle from Pasture A to Pasture C to allow grass recovery',
    type: 'management',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Farm Team',
    dueDate: '2024-01-28',
    createdAt: '2024-01-18T14:45:00Z',
    updatedAt: '2024-01-18T14:45:00Z',
    animalId: null
  },
  {
    id: 'task_006',
    farmId: 'farm_001',
    title: 'Water system maintenance',
    description: 'Inspect and clean automatic water dispensers in all barns',
    type: 'maintenance',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'Mike Wilson',
    dueDate: '2024-01-20',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-21T16:30:00Z',
    animalId: null
  },
  {
    id: 'task_007',
    farmId: 'farm_001',
    title: 'Hoof trimming for Thunder',
    description: 'Routine hoof care and trimming for senior bull',
    type: 'health',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Professional Hoof Trimmer',
    dueDate: '2024-02-10',
    createdAt: '2024-01-19T13:15:00Z',
    updatedAt: '2024-01-19T13:15:00Z',
    animalId: 'animal_006'
  },
  {
    id: 'task_008',
    farmId: 'farm_001',
    title: 'Barn ventilation check',
    description: 'Inspect ventilation systems and replace filters if needed',
    type: 'maintenance',
    priority: 'low',
    status: 'pending',
    assignedTo: 'Maintenance Team',
    dueDate: '2024-02-15',
    createdAt: '2024-01-22T09:30:00Z',
    updatedAt: '2024-01-22T09:30:00Z',
    animalId: null
  },
  {
    id: 'task_009',
    farmId: 'farm_001',
    title: 'Breeding schedule planning',
    description: 'Plan artificial insemination schedule for next breeding season',
    type: 'breeding',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'Breeding Specialist',
    dueDate: '2024-02-08',
    createdAt: '2024-01-16T10:20:00Z',
    updatedAt: '2024-01-23T14:10:00Z',
    animalId: null
  },
  {
    id: 'task_010',
    farmId: 'farm_001',
    title: 'Feed analysis',
    description: 'Send hay and silage samples for nutritional analysis',
    type: 'feeding',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Nutrition Consultant',
    dueDate: '2024-01-31',
    createdAt: '2024-01-17T15:45:00Z',
    updatedAt: '2024-01-17T15:45:00Z',
    animalId: null
  }
];

const sampleInventory: InventoryItem[] = [
  {
    id: 'inv_001',
    farmId: 'farm_001',
    name: 'Premium Cattle Feed',
    category: 'feed',
    quantity: 500,
    unit: 'kg',
    minStock: 100,
    cost: 2.50,
    supplier: 'Farm Supply Co.',
    location: 'Feed Storage A',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
  },
  {
    id: 'inv_002',
    farmId: 'farm_001',
    name: 'BVD Vaccine',
    category: 'medicine',
    quantity: 20,
    unit: 'doses',
    minStock: 5,
    cost: 15.00,
    supplier: 'Vet Pharma',
    location: 'Medicine Cabinet',
    expiryDate: '2025-12-31',
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: '2024-01-15T09:05:00Z',
  },
  {
    id: 'inv_003',
    farmId: 'farm_001',
    name: 'AI Straws - Angus Genetics',
    category: 'supplies',
    quantity: 150,
    unit: 'units',
    minStock: 20,
    cost: 50.00,
    supplier: 'Genetics Inc.',
    location: 'Breeding Lab',
    createdAt: '2023-07-10T11:30:00Z',
    updatedAt: '2024-01-18T11:00:00Z',
  },
];

const sampleStaff: StaffMember[] = [
  {
    id: 'staff_001',
    farmId: 'farm_001',
    name: 'John Smith',
    email: 'john.smith@farm.com',
    role: 'manager',
    department: 'Operations',
    phone: '+1 (555) 123-4567',
    avatar: 'https://example.com/avatars/john_smith.jpg',
    status: 'active',
    hireDate: '2020-01-15',
    permissions: ['manage_animals', 'view_reports', 'manage_staff'],
    hoursWorked: 160,
    performance: 95,
    location: 'Main Office',
    salary: 65000,
    emergencyContact: {
      name: 'Jane Smith',
      phone: '+1 (555) 123-4568',
      relationship: 'Spouse'
    }
  },
  {
    id: 'staff_002',
    farmId: 'farm_001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@farm.com',
    role: 'veterinarian',
    department: 'Animal Health',
    phone: '+1 (555) 987-6543',
    avatar: 'https://example.com/avatars/sarah_johnson.jpg',
    status: 'active',
    hireDate: '2019-05-20',
    permissions: ['diagnose_illness', 'prescribe_treatment', 'administer_vaccines'],
    hoursWorked: 140,
    performance: 98,
    location: 'Veterinary Clinic',
    salary: 75000,
    emergencyContact: {
      name: 'Mark Johnson',
      phone: '+1 (555) 987-6544',
      relationship: 'Spouse'
    }
  },
  {
    id: 'staff_003',
    farmId: 'farm_001',
    name: 'Mike Wilson',
    email: 'mike.wilson@farm.com',
    role: 'worker',
    department: 'Farm Operations',
    phone: '+1 (555) 555-1212',
    avatar: 'https://example.com/avatars/mike_wilson.jpg',
    status: 'active',
    hireDate: '2022-08-01',
    permissions: ['feeding', 'cleaning', 'animal_handling'],
    hoursWorked: 170,
    performance: 90,
    location: 'Barn 1',
    salary: 40000,
    emergencyContact: {
      name: 'Emily Wilson',
      phone: '+1 (555) 555-1213',
      relationship: 'Spouse'
    }
  },
];

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      animals: sampleAnimals,
      tasks: sampleTasks,
      inventory: sampleInventory,
      healthRecords: [],
      feedingRecords: [],
      breedingRecords: [],
      productionRecords: [],
      staff: sampleStaff,

      // Animal operations
      addAnimal: (animalData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newAnimal: Animal = {
          ...animalData,
          id: `animal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          measurements: [],
          vaccinations: animalData.vaccinations || [],
          treatments: animalData.treatments || [],
          qrCode: `QR_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ animals: [...state.animals, newAnimal] }));
      },

      updateAnimal: (id, animalData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          animals: state.animals.map(animal =>
            animal.id === id && animal.farmId === farmId
              ? { ...animal, ...animalData, updatedAt: new Date().toISOString() }
              : animal
          )
        }));
      },

      deleteAnimal: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          animals: state.animals.filter(animal => !(animal.id === id && animal.farmId === farmId)),
          healthRecords: state.healthRecords.filter(record => !(record.animalId === id && record.farmId === farmId)),
          feedingRecords: state.feedingRecords.filter(record => !(record.animalId === id && record.farmId === farmId)),
          productionRecords: state.productionRecords.filter(record => !(record.animalId === id && record.farmId === farmId)),
        }));
      },

      // Task operations
      addTask: (taskData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newTask: Task = {
          ...taskData,
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, taskData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id && task.farmId === farmId
              ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
              : task
          )
        }));
      },

      deleteTask: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          tasks: state.tasks.filter(task => !(task.id === id && task.farmId === farmId))
        }));
      },

      // Inventory operations
      addInventoryItem: (itemData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newItem: InventoryItem = {
          ...itemData,
          id: `inventory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set(state => ({ inventory: [...state.inventory, newItem] }));
      },

      updateInventoryItem: (id, itemData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          inventory: state.inventory.map(item =>
            item.id === id && item.farmId === farmId
              ? { ...item, ...itemData, updatedAt: new Date().toISOString() }
              : item
          )
        }));
      },

      deleteInventoryItem: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          inventory: state.inventory.filter(item => !(item.id === id && item.farmId === farmId))
        }));
      },

      // Health record operations
      addHealthRecord: (recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newRecord: HealthRecord = {
          ...recordData,
          id: `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ healthRecords: [...state.healthRecords, newRecord] }));

        // Update animal's health score
        const { updateAnimal } = get();
        updateAnimal(recordData.animalId, { healthScore: recordData.healthScore });
      },

      updateHealthRecord: (id, recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          healthRecords: state.healthRecords.map(record =>
            record.id === id && record.farmId === farmId ? { ...record, ...recordData } : record
          )
        }));
      },

      deleteHealthRecord: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          healthRecords: state.healthRecords.filter(record => !(record.id === id && record.farmId === farmId))
        }));
      },

      // Feeding record operations
      addFeedingRecord: (recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newRecord: FeedingRecord = {
          ...recordData,
          id: `feeding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ feedingRecords: [...state.feedingRecords, newRecord] }));
      },

      updateFeedingRecord: (id, recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          feedingRecords: state.feedingRecords.map(record =>
            record.id === id && record.farmId === farmId ? { ...record, ...recordData } : record
          )
        }));
      },

      deleteFeedingRecord: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          feedingRecords: state.feedingRecords.filter(record => !(record.id === id && record.farmId === farmId))
        }));
      },

      // Breeding record operations
      addBreedingRecord: (recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newRecord: BreedingRecord = {
          ...recordData,
          id: `breeding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ breedingRecords: [...state.breedingRecords, newRecord] }));
      },

      updateBreedingRecord: (id, recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          breedingRecords: state.breedingRecords.map(record =>
            record.id === id && record.farmId === farmId ? { ...record, ...recordData } : record
          )
        }));
      },

      deleteBreedingRecord: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          breedingRecords: state.breedingRecords.filter(record => !(record.id === id && record.farmId === farmId))
        }));
      },

      // Production record operations
      addProductionRecord: (recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newRecord: ProductionRecord = {
          ...recordData,
          id: `production_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
          createdAt: new Date().toISOString(),
        };
        set(state => ({ productionRecords: [...state.productionRecords, newRecord] }));
      },

      updateProductionRecord: (id, recordData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          productionRecords: state.productionRecords.map(record =>
            record.id === id && record.farmId === farmId ? { ...record, ...recordData } : record
          )
        }));
      },

      deleteProductionRecord: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          productionRecords: state.productionRecords.filter(record => !(record.id === id && record.farmId === farmId))
        }));
      },

      // Staff operations
      addStaffMember: (staffData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newStaff: StaffMember = {
          ...staffData,
          id: `staff_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          farmId,
        };
        set(state => ({ staff: [...state.staff, newStaff] }));
      },

      updateStaffMember: (id, staffData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          staff: state.staff.map(member =>
            member.id === id && member.farmId === farmId
              ? { ...member, ...staffData }
              : member
          )
        }));
      },

      deleteStaffMember: (id) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          staff: state.staff.filter(member => !(member.id === id && member.farmId === farmId))
        }));
      },

      // Measurement operations
      addMeasurement: (animalId, measurementData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        const newMeasurement: Measurement = {
          ...measurementData,
          id: `measurement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };

        set(state => ({
          animals: state.animals.map(animal =>
            animal.id === animalId && animal.farmId === farmId
              ? {
                  ...animal,
                  measurements: [...animal.measurements, newMeasurement],
                  updatedAt: new Date().toISOString()
                }
              : animal
          )
        }));
      },

      updateMeasurement: (animalId, measurementId, measurementData) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          animals: state.animals.map(animal =>
            animal.id === animalId && animal.farmId === farmId
              ? {
                  ...animal,
                  measurements: animal.measurements.map(measurement =>
                    measurement.id === measurementId
                      ? { ...measurement, ...measurementData }
                      : measurement
                  ),
                  updatedAt: new Date().toISOString()
                }
              : animal
          )
        }));
      },

      deleteMeasurement: (animalId, measurementId) => {
        const farmId = getCurrentFarmId();
        if (!farmId) return;

        set(state => ({
          animals: state.animals.map(animal =>
            animal.id === animalId && animal.farmId === farmId
              ? {
                  ...animal,
                  measurements: animal.measurements.filter(measurement => measurement.id !== measurementId),
                  updatedAt: new Date().toISOString()
                }
              : animal
          )
        }));
      },
    }),
    {
      name: 'agroinsight-data-storage',
      version: 6,
      migrate: (persistedState: any) => {
        // Add migration logic here if needed in the future
        return persistedState;
      },
    }
  )
);

// Create a hook that returns filtered data for the current user's farm
export const useFarmData = () => {
  const store = useDataStore();
  const farmId = getCurrentFarmId();

  if (!farmId) {
    return {
      animals: [],
      tasks: [],
      inventory: [],
      healthRecords: [],
      feedingRecords: [],
      breedingRecords: [],
      productionRecords: [],
      staff: [],
      ...store
    };
  }

  return {
    animals: store.animals.filter(animal => animal.farmId === farmId),
    tasks: store.tasks.filter(task => task.farmId === farmId),
    inventory: store.inventory.filter(item => item.farmId === farmId),
    healthRecords: store.healthRecords.filter(record => record.farmId === farmId),
    feedingRecords: store.feedingRecords.filter(record => record.farmId === farmId),
    breedingRecords: store.breedingRecords.filter(record => record.farmId === farmId),
    productionRecords: store.productionRecords.filter(record => record.farmId === farmId),
    staff: store.staff.filter(member => member.farmId === farmId),
    ...store
  };
};

// Export the main useData hook for backward compatibility
export const useData = useFarmData;

// Export specific hooks for different data types
export const useFarmAnimals = () => {
  const { animals } = useFarmData();
  return animals;
};

export const useFarmTasks = () => {
  const { tasks } = useFarmData();
  return tasks;
};

export const useFarmInventory = () => {
  const { inventory } = useFarmData();
  return inventory;
};

export const useFarmStaff = () => {
  const { staff } = useFarmData();
  return staff;
};