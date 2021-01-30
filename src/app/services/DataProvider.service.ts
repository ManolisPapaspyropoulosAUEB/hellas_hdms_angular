import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RemoteDataService } from "./RemoteDataService.service";
import 'rxjs/Rx';

@Injectable()
export class DataProvider {

  constructor(private http: HttpClient, private remoteDataService: RemoteDataService) {
  }

  updateInstallerPwd(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "updateInstallerPwd", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }



  getContactsInformationsByType(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "getContactsInformationsByType", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }



  addContactInformation(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "addContactInformation", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }


  deleteContactInformation(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "deleteContactInformation", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateContactInformation(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "updateContactInformation", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getContactsInformations(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "getContactsInformations", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  insertNotification(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "insertNotification", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }






  setDataCC(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "setDatacc", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  changeStatus(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "changeStatus", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getInstallersDataCc(data){
    return this.http.post<any>(this.remoteDataService.serviceURL + "getInstallersDataCc", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  checkEmailIfExist(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "checkEmailIfExist", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateProfile(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "updateProfile", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getProfile(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "getProfile", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sendMessage(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "sendMessage", data).map(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteNote(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "deleteNote", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  insertNote(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "insertNote", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  updateNote(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "updateNote", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  getNotes(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "getNotes", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  getData(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "getData", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  getInstallers(data) {
    console.log("DATA",data);

    return this.http.post<any>(this.remoteDataService.serviceURL + "getInstallers", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  updateCustomer(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "updateCustomer", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  setActive(data) {
    return this.http.post<any>(this.remoteDataService.serviceURL + "setActive", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  createCustomer(data) {
    console.log("IN CREATE CUSTOMER with data passed:", data);
    return this.http.post<any>(this.remoteDataService.serviceURL + "createCustomer", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }

  setData(data) {
    console.log("IN setData with data passed:", data);
    return this.http.post<any>(this.remoteDataService.serviceURL + "setData", data).map((response) => {
      return response;
    }, (error) => {
      console.log(error);
    })
  }
}
