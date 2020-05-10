<template>
    <div class="page-wrapper">
        <nav class="navbar navbar-dark navbar-expand-md navbar-no-bg">
            <div class="navbar-wrapper container">
                <div class="nav-brand">
                    <a class="navbar-brand" href="index.html">
											<img src="images/logo.png" />
										</a>
                </div>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <router-link to="/todo-list">Todo List</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/daily-vocabulary"
                                >Daily Vocabulary</router-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
						<div class="ml-auto right-nav">
								<span>NguyenTuanAnh@gmail.com</span>
								<i class="fas fa-list"></i>
						</div>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../sass/_variables.scss";

.navbar {
    background: $green;
    -o-transition: all 0.6s;
    -moz-transition: all 0.6s;
    -webkit-transition: all 0.6s;
    -ms-transition: all 0.6s;
    transition: all 0.6s;
		backface-visibility: hidden;
		img{
			width: 50px;
			height: 50px;
		}
    .navbar-wrapper {
        width: 100%;
        margin-left: 0;
        #navbarNav {
            ul {
                li {
                    border-radius: 3px;
                    padding: 10px;
                    a {
                        font-family: $font-family-roboto-bold;
                        color: $white;
                        font-weight: bold;
                        padding: 5px;
                        &:hover {
                            text-decoration: none;
                        }
                    }
                    &:hover {
                        background-color: $bgc-hover;
                    }
                }
            }
        }
    }
		.right-nav{
			padding-right: 10px;
			color: #fff;
			font-weight: bold;
			font-size: $font-medium;
			span{
				padding: 10px;
				border-radius: 5px;
				background-color: #499b82;
			}
			i{
				padding: 10px;
				border-radius: 5px;
				cursor: pointer;
				&:hover{
					background-color: #499b82;
				}
			}
		}
}

.page-container {
    padding: 40px 15px;
    margin: auto;
    height: 100%;
    background-color: #fff;
    margin: 30px;
}

.navbar.navbar-no-bg {
    background: $green;
    background: $green;
}
</style>
