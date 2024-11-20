type Lecture = {
    id:string
lecture_name:string	
instructor_name:string	
objective:string
day_period:string
category:string
evaluation:string
} 

type Review = {
  id:string
  userId: string       
  lectureId  :string      
  createdAt  :string  
  updatedAt  :string  
  comment  :string  
  atmosphereRating:number
  easinessRating:number
  futureRating:number
  user?    :User|null
  lecture_name:string 

}

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type BookMark = {
  id: string;
  userId:string;
  lectureId: string;
  createdAt: string
};


  

export type {Lecture,Review,User,BookMark}