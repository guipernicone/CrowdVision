package com.tcc.CrowdVision.Server.Login;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.TimerTask;

import com.tcc.CrowdVision.Repository.LoginRepository;
import com.tcc.CrowdVision.Utils.BeanUtils;
import com.tcc.CrowdVision.Utils.DateUtils;

public class LoginTimeTask extends TimerTask {
	public void run() {
		LoginRepository loginRepository = BeanUtils.getBean(LoginRepository.class);
		
		List<Login> loginList = loginRepository.findAll();
		
		for (Login login : loginList) {
			try {
				Date dateLogin = DateUtils.convetStringToDate(login.getCreationDate(), "dd-MM-yyyy hh:mm:ss");
//				if (dateLogin. )
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
        System.out.println("Task performed on: " + new Date() + " " +
          "Thread's name: " + Thread.currentThread().getName());
    }
}
