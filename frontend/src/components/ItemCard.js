import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './ItemCard.css'

const ItemCard=({value,imgUrl,item, price, startDate, endDate})=>{
  return(
          <div class='col-12 col-md-6 col-lg-4'>
            <div class='card ' >
              
              <img src={imgUrl} alt="" class="card-img-top"/>
          
              

              <div class='class-body'>
                <h3 class='card-title'>{item}</h3>
                <p class='card-text'>
                  Price:{price}<br/>
                  Date Range:{startDate} - {endDate}
                </p>
              </div>
            </div>
            </div>
          
  );
}






// const ItemCard = ({ item, price, startDate, endDate }) => {
//   return (
//     <Card className="my_card">
//       <CardContent>
//         <Typography variant="h5" component="h2">
//           {item}
//         </Typography>
//         <Typography color="textSecondary">Price: {price}</Typography>
//         <Typography color="textSecondary">
//           Date Range: {startDate} - {endDate}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

export default ItemCard;
