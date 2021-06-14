import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import api from '../../services/api';

import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';

interface NewFoodProps {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface FoodProps extends NewFoodProps {
  id: number; 
  available: boolean;
}

function Dashboard() {
      const [foods, setFoods] = useState<FoodProps[]>([]);
      const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
      const [modalOpen, setModalOpen] = useState(false);
      const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function fetchFood() {
      const { data } = await api.get('/foods');
      return data;
    }
    fetchFood().then(response => setFoods(response));
  }, []);

  const handleAddFood = async (food: NewFoodProps) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: FoodProps) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => setModalOpen(prevValue => !prevValue);

  const toggleEditModal = () => setEditModalOpen(prevValue => !prevValue);

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
