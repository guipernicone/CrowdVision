package com.tcc.CrowdVision.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tcc.CrowdVision.Server.Organization.Organization;


public interface OrganizationRepository extends MongoRepository<Organization, String> {

}
