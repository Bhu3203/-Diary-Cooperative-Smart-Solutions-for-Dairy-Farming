import React from 'react'
import "../User/siderBar/SideBar.css";
import { Link, Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "../User/HomeUser.css";

export default function HomeUser() {
  return (
   <>
   <div className="HomeUser">
    <div className="row">
        <div className="col-xl-3">
        <div className='sideBar'>
                <ul className="sidebarList">
                    
                    <li>
                        <Link to="/userdash/Dashboard" className="title">
                            <span>
                                <DashboardIcon />
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                        
                    </li>

                    <li>
                        <Link to="/userdash/buyandsell" className="title">
                            <span>
                                {/* <BuyAndSellCattle /> */}
                            </span>
                            <span className="title">Cattel Listing</span>
                        </Link>
                    </li>


                </ul>

            </div>
        </div>
        <div className="col-xl-9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sapiente perferendis ipsa dicta. Nesciunt esse ex totam impedit, nihil reiciendis officia ea natus eum numquam est necessitatibus consequuntur vel atque beatae quia velit expedita blanditiis aperiam tempora dolorem nam debitis? Repudiandae quasi quaerat quo non laboriosam tempora consectetur et tempore quos quisquam dolor nobis facere ipsam similique libero recusandae atque animi eligendi dolores odit quam expedita, cumque impedit obcaecati! Eius, eveniet et cupiditate laborum at delectus sed, quos corrupti odio autem nemo quia voluptates officiis rerum minima. Eligendi recusandae amet odit praesentium ipsa quis mollitia facilis. Eaque commodi amet ratione aut voluptas sit, aliquam molestias. Minus esse eligendi, corporis error hic in nam ullam laudantium placeat repellendus fugiat mollitia saepe. Ad ullam, repellat voluptatibus ab atque eligendi quam est facere, beatae officiis iste totam consequuntur adipisci reiciendis delectus tempora quas quidem! Sunt velit totam nostrum sequi voluptatum eos beatae harum odio perspiciatis, nihil culpa odit. Cupiditate ea qui provident omnis maiores laudantium repudiandae accusamus culpa corrupti, inventore, eos saepe eaque vitae facilis excepturi! Amet ipsa iste reprehenderit, exercitationem eveniet sed voluptatem voluptatum ex dignissimos excepturi officiis maxime? Magnam obcaecati incidunt quos veritatis error commodi voluptatem enim repellendus dolor qui aut necessitatibus eum itaque eveniet, numquam iure totam soluta quidem inventore. Non placeat, eos nam sit aut soluta quisquam maxime quaerat natus dolor fuga alias deleniti facere ad? Voluptatum eos atque sint, ducimus ipsam impedit velit necessitatibus nihil ipsum mollitia quisquam, similique fuga dicta! Iure impedit odio obcaecati harum excepturi eaque est quis aliquam laudantium debitis ex et corporis saepe non, quo, quisquam dolore. Facere esse delectus repudiandae placeat illum commodi fuga saepe voluptas laborum, magnam recusandae consectetur adipisci dolores suscipit atque cumque sint blanditiis quia perspiciatis. Praesentium pariatur ex repudiandae itaque veritatis accusantium? Totam odit qui consequatur iste soluta voluptates?
        </div>
    </div>
   </div>
   </>
  )
}
