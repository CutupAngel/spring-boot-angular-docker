import { Component, OnInit } from "@angular/core";
import { StorageService } from "./_services/storage.service";
import { AuthService } from "./_services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes("ROLE_ADMIN");
      this.showUserBoard = this.roles.includes("ROLE_USER");

      this.username = user.username;
    }
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
